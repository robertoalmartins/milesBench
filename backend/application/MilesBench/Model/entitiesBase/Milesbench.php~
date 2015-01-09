<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Milesbench
 *
 * @ORM\Table(name="milesbench", indexes={@ORM\Index(name="fk_milesbench_businesspartner1_idx", columns={"businesspartner_id"})})
 * @ORM\Entity
 */
class Milesbench
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
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
     * @var \Businesspartner
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="Businesspartner")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="businesspartner_id", referencedColumnName="id")
     * })
     */
    private $businesspartner;


    /**
     * Set id
     *
     * @param integer $id
     * @return Milesbench
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

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
     * Set businesspartner
     *
     * @param \Businesspartner $businesspartner
     * @return Milesbench
     */
    public function setBusinesspartner(\Businesspartner $businesspartner)
    {
        $this->businesspartner = $businesspartner;

        return $this;
    }

    /**
     * Get businesspartner
     *
     * @return \Businesspartner 
     */
    public function getBusinesspartner()
    {
        return $this->businesspartner;
    }
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="due_date", type="datetime", nullable=false)
     */
    private $dueDate;

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
