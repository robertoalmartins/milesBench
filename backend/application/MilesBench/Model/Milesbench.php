<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Milesbench
 *
 * @ORM\Table(name="milesbench", uniqueConstraints={@ORM\UniqueConstraint(name="id_UNIQUE", columns={"id"})}, indexes={@ORM\Index(name="fk_milesbench_Cards1_idx", columns={"cards_id"})})
 * @ORM\Entity
 */
class Milesbench
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="leftover", type="decimal", precision=20, scale=0, nullable=false)
     */
    private $leftover = '0';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="lastchange", type="datetime", nullable=true)
     */
    private $lastchange;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="due_date", type="datetime", nullable=false)
     */
    private $dueDate;

    /**
     * @var string
     *
     * @ORM\Column(name="cost_per_thousand", type="decimal", precision=10, scale=0, nullable=false)
     */
    private $costPerThousand = '0';

    /**
     * @var \Cards
     *
     * @ORM\ManyToOne(targetEntity="Cards")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="cards_id", referencedColumnName="id")
     * })
     */
    private $cards;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set leftover
     *
     * @param string $leftover
     * @return Milesbench
     */
    public function setLeftover($leftover)
    {
        $this->leftover = $leftover;
    
        return $this;
    }

    /**
     * Get leftover
     *
     * @return string 
     */
    public function getLeftover()
    {
        return $this->leftover;
    }

    /**
     * Set lastchange
     *
     * @param \DateTime $lastchange
     * @return Milesbench
     */
    public function setLastchange($lastchange)
    {
        $this->lastchange = $lastchange;
    
        return $this;
    }

    /**
     * Get lastchange
     *
     * @return \DateTime 
     */
    public function getLastchange()
    {
        return $this->lastchange;
    }

    /**
     * Set dueDate
     *
     * @param \DateTime $dueDate
     * @return Milesbench
     */
    public function setDueDate($dueDate)
    {
        $this->dueDate = $dueDate;
    
        return $this;
    }

    /**
     * Get dueDate
     *
     * @return \DateTime 
     */
    public function getDueDate()
    {
        return $this->dueDate;
    }

    /**
     * Set costPerThousand
     *
     * @param string $costPerThousand
     * @return Milesbench
     */
    public function setCostPerThousand($costPerThousand)
    {
        $this->costPerThousand = $costPerThousand;
    
        return $this;
    }

    /**
     * Get costPerThousand
     *
     * @return string 
     */
    public function getCostPerThousand()
    {
        return $this->costPerThousand;
    }

    /**
     * Set cards
     *
     * @param \Cards $cards
     * @return Milesbench
     */
    public function setCards(\Cards $cards = null)
    {
        $this->cards = $cards;
    
        return $this;
    }

    /**
     * Get cards
     *
     * @return \Cards 
     */
    public function getCards()
    {
        return $this->cards;
    }
}
